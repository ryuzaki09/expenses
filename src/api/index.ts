export const api = {
  async getExpensesForMonth() {
    return Promise.resolve([
      {
        store: 'McDonalds',
        date: '02/03/2023',
        amount: 20.3,
      },
      {
        store: 'Hamleys',
        date: '01/03/2023',
        amount: 18.3
      }
    ])
  }
}
