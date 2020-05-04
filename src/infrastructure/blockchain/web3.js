import Web3 from 'web3';

let _web3 = null

export const getWeb3 = async () => {

    if (_web3) {
        return _web3
    }

    if(window.ethereum) {
        _web3= new Web3(window.ethereum)
        await window.ethereum.enable()
        return _web3
    } else if (window.web3) {
        _web3= Web3(window.web3.currentProvider)
        return _web3
    } else {
        throw new Error('failed to initialize web3')
    }
}