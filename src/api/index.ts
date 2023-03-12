export default {
  async getExpensesForMonth() {
    return Promise.resolve({
      data: [
        {
          title: 'McDonalds',
          date: '02/03/2023',
          amount: 20.3,
        },
        {
          title: 'Hamleys',
          date: '01/03/2023',
          amount: 18.3
        }
      ]
    })
  },

  async addExpense(title: string, date: string, amount: number) {
    
  }
}
