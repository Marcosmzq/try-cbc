export const preferenceDefaultConfig = (userID: number) => {
  return {
    binary_mode: false,
    statement_descriptor: 'tryCBC',
    external_reference: userID.toString(),
    items: [
      {
        title: 'Comprar cuenta PREMIUN de tryCBC',
        category_id: 'learnings',
        currency_id: 'ARS',
        unit_price: 500,
        quantity: 1,
        description:
          'Potencia tu cuenta de tryCBC y desbloquea beneficios, ejercicios y materias exlusivas. ¡Mejora tu cuenta y lleva tu aprendizaje a otro nivel!',
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
