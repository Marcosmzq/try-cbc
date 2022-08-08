export const preferenceDefaultConfig = (userID: number) => {
  return {
    binary_mode: false,
    statement_descriptor: 'tryCBC',
    external_reference: userID.toString(),
    items: [
      {
        title: 'Comprar el curso tryCBC y aprobá fácil.',
        category_id: 'learnings',
        currency_id: 'ARS',
        unit_price: 2499,
        quantity: 1,
        description:
          'Deja de sufrir estudiando y APROBA MÁS FÁCIL con las funciones que tenemos preparadas para vos',
      },
    ],
    back_urls: {
      success: `${process.env.CLIENT_URL}/buy-response`,
      failure: `${process.env.CLIENT_URL}/buy-response`,
      pending: `${process.env.CLIENT_URL}/buy-response`,
    },
    auto_return: 'approved',
  };
};
