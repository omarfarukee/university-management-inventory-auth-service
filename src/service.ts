import mongoose = require('mongoose')
import config from './config/index'
import app from './app'
// main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.dataBase_url as string)
    console.log('database connected')

    app.listen(config.port, () => {
      console.log(`application app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('fail to connect')
  }
}
main()
