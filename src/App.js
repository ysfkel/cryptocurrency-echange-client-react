import React from 'react';
 import './App.css';
import {getAccount, getTokenBalance, getEtherBalance, buyTokens} from './infrastructure/blockchain/blockchain'
import NavBar from './components/nav-bar/nav-bar'
import Exchange from './components/exchange/exchange'

class  App extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          user:null
      }
  }

  componentWillMount = async () => {

      try {
        const accounts = await getAccount()
        const [account] = accounts 
        console.log('--account ',account)

        this.setState({ userAccount: account})

        const etherBalance = await getEtherBalance(account)
        console.log('--balance ',etherBalance)
        this.setState({etherBalance})

        const tokenBalance = await getTokenBalance(account)
        console.log('--tokenBalance ',tokenBalance)
        this.setState({tokenBalance}) 
        
      } catch(e) {
        console.log(e)
      }

  } 

  render() {
    return (
      <div className="App">
        <NavBar account={this.state.account}/>
        <br/>
        <div className='exchange'>
          <Exchange 
             userAccount = {this.state.userAccount}
             tokenBalance={this.state.tokenBalance}
             etherBalance={this.state.etherBalance}
             buyTokens={buyTokens}
          />
        </div>
      </div>
    );
  }
}

export default App;
