import eve from 'evejs';

function CompradorAgent(id, props) {
  // execute super constructor
  eve.Agent.call(this, id);

  this.props = props;

  // babblify the agent
  this.extend('babble');

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
CompradorAgent.prototype = Object.create(eve.Agent.prototype);
// you need to reset the constructor property for the class CompradorAgent
// using MyAgent.prototype.constructor = CompradorAgent;
// otherwise instances of CompradorAgent would have a constructor of eve.Agent.
CompradorAgent.prototype.constructor = CompradorAgent;

// have a conversation with an other agent
CompradorAgent.prototype.sale = function sale(agent) {
  this.tell(agent.name, 'sale')
    .tell((message, context) => {
      console.log(this.id, this.props.money, 'before');
      return agent;
    })
    .listen((message, context) => {
      console.log(context.from + ': ' + message.response);
      if (message.status) {
        this.props.money -= message.money;
      }
      console.log(this.id, this.props.money, 'after');
      return message;
    });
};

export default CompradorAgent;

