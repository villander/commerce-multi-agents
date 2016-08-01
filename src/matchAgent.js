import babble from 'babble';
import eve from 'evejs';
import {Promise} from 'es6-promise';

function MatchAgent(id, props) {
  // execute super constructor
  eve.Agent.call(this, id);

  this.props = props;

  // babblify the agent
  this.extend('babble');

  this.listen('search')
    .listen((message, context) => {
      return this.search(message);
    })
    .tell((message, context) => {
      return message;
    });

  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
MatchAgent.prototype = Object.create(eve.Agent.prototype);
MatchAgent.prototype.constructor = MatchAgent;

MatchAgent.prototype.search = function search(params) {
  const productName = params.name;
  const productPrice = params.price;

  const agentsWished = [];

  return new Promise((resolve, reject) => {

    this.props.forEach((vendor) => {
      this.tell(vendor.name, 'searchProducts')
        .tell((message, context) => {
          return {
            productName,
            productPrice
          };
        })
        .listen((message, context) => {
          if (message) {
            agentsWished.push({ agent: context.from, product: message });
          }
          if (this.props[Object.keys(this.props)[Object.keys(this.props).length - 1]].name === context.from) {
            resolve(agentsWished);
          }
        });
    });
  });
};

export default MatchAgent;
