import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './style.css'
import {toWei } from '../../infrastructure/blockchain/blockchain'

class Exchange extends Component {

    
    constructor(props) {
      super(props)
      this.state = { 
        numberOfTokensToBuy:0,
        etherAmount:0,
      }
    }

    handleChange = (e) => {

    
       
      let etherAmount = e.target.value;

      const rate = 100; //1 ether = 100 etn

      let numberOfTokensToBuy = etherAmount * rate
      this.setState({numberOfTokensToBuy,etherAmount})
      console.log('value ',numberOfTokensToBuy)
    }

    handleSubmit = async (e) => {

      e.preventDefault() 

      const weiAmount = await toWei(this.state.etherAmount)
      this.props.buyTokens({
        etherAmount: weiAmount,
        userAccount: this.props.userAccount
      })

    }


    render() {
      
      return(
        <Card variant="outlined">
        <CardContent>
      
          <form noValidate autoComplete="off" onSubmit={e=>this.handleSubmit(e)}>
            
             <div>
             <span className="balance">{this.props.etherBalance} ETH</span>
             <TextField  onChange = {(e) => this.handleChange(e)} InputLabelProps={{
                shrink: true,
                }} id="outlined-basic" label="Ether"  placeholder="Ether" variant="outlined" fullWidth />
             </div>
            
             <div>
             <span className="balance">{this.props.tokenBalance} ETN</span>
               <TextField 
               value={this.state.numberOfTokensToBuy}
               InputLabelProps={{
                shrink: true,
               }} id="outlined-basic"  label="ETN"  placeholder="ETN" variant="outlined" fullWidth />
             </div>
             <CardActions>
          <Button size="small" type="submit">Buy</Button>
        </CardActions>

            </form>

            {/* <Typography variant="body2" component="p">
                 {this.state.numberOfTokensToBuy}
            </Typography> */}
        </CardContent>
      

      </Card>
    )
              }
    
}

export default Exchange
