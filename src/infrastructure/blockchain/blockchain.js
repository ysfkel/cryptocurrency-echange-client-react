import {getWeb3} from './web3'
import Token from './abi/Token.json'
import EternalSwap from './abi/EternalSwap.json'

let _tokenContract = null
let _eternalSwapContract = null

export const getAccount = async () => {

    const web3 = await getWeb3()

    const accounts = await web3.eth.getAccounts()

    return accounts

}

export const getEtherBalance = async (account) => {

    if (!account) {
         throw new Error('account cannnot be empty')
    }

    try {
        const web3 = await getWeb3()

        const balance = await web3.eth.getBalance(account)

        if (balance) {
            return toEther(balance.toString())
        }

        return balance;
    } catch(e) {
        throw e
    }
}

export const getTokenContract = async () => {

    if (_tokenContract) {
        return _tokenContract
    }

    try {
        const web3 = await getWeb3()
        const networkID = await web3.eth.net.getId() //get current network id eg Ganache
        const abi = Token.abi

        const networkData = Token.networks[networkID] 

        if(!networkData) {
            throw new Error('Token contract not deployed to detected network')
        }

        const contractAddress = networkData.address 

        _tokenContract = new web3.eth.Contract(abi, contractAddress)

        return _tokenContract

    } catch(e) {
        throw e
    }
}


export const getTokenBalance = async (account) => {

    try {
      
      const tokenContact = await getTokenContract()

      const balance = await tokenContact.methods.balanceOf(account).call()

      if (balance) {
          return toEther(balance.toString())
      }

       return null

    } catch(e) {
        throw e
    }
}

export const getEternalSwapContract = async () => {

    if (_eternalSwapContract) {
        return _eternalSwapContract
    }

    try {
        const web3 = await getWeb3()
        const networkID = await web3.eth.net.getId() //get current network id eg Ganache
        const abi = EternalSwap.abi

        const networkData = EternalSwap.networks[networkID] 

        if(!networkData) {
            throw new Error('EternalSwap contract not deployed to detected network')
        }

        const contractAddress = networkData.address 

        _eternalSwapContract = new web3.eth.Contract(abi, contractAddress)

        return _eternalSwapContract

    } catch(e) {
        throw e
    }
}


export const buyTokens = async ({etherAmount, userAccount}) => {

    const eternalSwap = await getEternalSwapContract()

    eternalSwap
    .methods
    .buyTokens()
    .send({value: etherAmount,from:userAccount})
    .on('transactionHash',(hash) => {
        console.log('transaction hash ', hash)
    })

}

export const toEther = async (weivalue) => {

    const web3 = await getWeb3()
    const etherValue  = web3.utils.fromWei(weivalue, 'ether');

    return etherValue
}

export const toWei = async (ethvalue) => {

    const web3 = await getWeb3()
    const weiValue  = web3.utils.toWei(ethvalue, 'ether');

    return weiValue
}



