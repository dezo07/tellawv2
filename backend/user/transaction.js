import { database } from "/backend/database/database.js";
import { getCryptoPrice} from "/backend/api/crypto/crypto.js";
export class Transaction {
    constructor(symbol, ammount, type, id, walletid){
      this.symbol = symbol;
      this.ammount = ammount;
      this.type = type
      this.id = id
      this.walletid = walletid
    }
    async transac(){
    
      const userCryptoRef = database.ref(`users/${this.id}/wallets/${this.walletid}/cryptos/${this.symbol}`);
      
      userCryptoRef.transaction((currentValue) => {
        if (!currentValue) {
          return parseFloat(this.ammount);
        }
        let newValue = 0;
        if (this.type) {
          newValue = currentValue + parseFloat(this.ammount);
        } else {
          newValue = currentValue - parseFloat(this.ammount);
        }
      
        return newValue >= 0 ? parseFloat(newValue) : currentValue;
      })
      .then(() => {
        console.log("crypto edited!");
      })
      .catch((error) => {
        console.error('Error adding crypto:', error);
      });
    }
  }