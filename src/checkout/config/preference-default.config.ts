export const preferenceDefaultConfig = (userID: number) => {
  return {
    binary_mode: false,
    statement_descriptor: 'tryCBC',
    external_reference: userID.toString(),
    items: [
      {
        title: 'Potenciar de tryCBC y obtener beneficios únicos',
        category_id: 'learnings',
        currency_id: 'ARS',
        unit_price: 2000,
        quantity: 1,
        description:
          'Deja de sufrir estudiando y APROBA MÁS FÁCIL con las nuevas funciones que tenemos preparadas para vos',
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
