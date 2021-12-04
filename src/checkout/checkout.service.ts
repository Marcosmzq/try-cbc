import { Injectable } from '@nestjs/common';
import { preferenceDefaultConfig } from './config/preference-default.config';
const mercadopago = require('mercadopago');
const axios = require('axios');

@Injectable()
export class CheckoutService {
  async getInitPoint(userID: number) {
    const preference = preferenceDefaultConfig(userID);
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });
    const createPreference = await mercadopago.preferences
      .create(preference)
      .then(function (response) {
        global.id = response.body.id;
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return createPreference.body.init_point;
  }

  getUserPaymentsResults(userID: number) {
    return axios.get(
      `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=${userID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
        transformResponse: [
          (data) => {
            const payments = JSON.parse(data);
            return payments.results.map((result) => {
              return result.status;
            });
          },
        ],
      },
    );
  }

  async checkIfUserHasApprovedPayments(userID: number) {
    const getPaymentsResults = await this.getUserPaymentsResults(userID);
    return getPaymentsResults.data.some(
      (paymentStatus) => paymentStatus === 'approved',
    );
  }
}
