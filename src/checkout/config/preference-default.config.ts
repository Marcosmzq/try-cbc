export const preferenceDefaultConfig = (userID: number) => {
  return {
    binary_mode: false,
    statement_descriptor: 'tryCBC',
    external_reference: userID.toString(),
    items: [
      {
        title: 'Mejorar tu cuenta de tryCBC',
        category_id: 'learnings',
        currency_id: 'ARS',
        unit_price: 350,
        quantity: 1,
        description:
          'Potencia tu cuenta de tryCBC comprando premiun y desbloquea beneficios exclusivos.',
      },
    ],
    back_urls: {
      success: `${process.env.CLIENT_URL}/premium/buy-response`,
      failure: `${process.env.CLIENT_URL}/premium/buy-response`,
      pending: `${process.env.CLIENT_URL}/premium/buy-response`,
    },
    auto_return: 'approved',
  };
};
