import babble from 'babble';
import eve from 'evejs';

function VendedorAgent(id, props) {
  // execute super constructor
  eve.Agent.call(this, id);

  this.props = props;
  this.money = 0;

  // babblify the agent
  this.extend('babble');

  // add a traffic conversation with comprador
  this.listen('sale')
    .listen((message, context) => {
      if (this.props) {
        console.log(this.id, this.props, 'before');
        this.money = this.props.price;
        this.props = null;
        console.log(this.id, this.props, 'after');
        console.log(this.id, this.money, 'money');
        return { status: true, response: 'Sale done with success', money: this.money };
      } else {
        return { status: false, response: 'Sorry, the proudcty the product has been sold' };
      }
    })
    .tell((message) => {
      return message;
    });

  // add a conversation listener
  this.listen('searchProducts')
    .listen((message, context) => {
      let product;
      if (message.productName === this.props.name && message.productPrice >= this.props.price) {
        console.log(`${context.from}: The ${this.id} have your wish`);
        product = { name: this.props.name, price: this.props.price };
      } else {
        console.log(`${context.from}: The ${this.id} not have your wish`);
      }
      return product;
    })
    .tell((message, context) => {
      return message;
    });

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
VendedorAgent.prototype = Object.create(eve.Agent.prototype);
VendedorAgent.prototype.constructor = VendedorAgent;

export default VendedorAgent;

