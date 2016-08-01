import eve from 'evejs';
import VendedorAgent from './vendedorAgent';
import CompradorAgent from './compradorAgent';
import agents from './fixtures/dummy-agents';
import MatchAgent from './matchAgent';

const arrayOfAgentsVendors = agents;
const vendors = {};

arrayOfAgentsVendors.forEach((agent) => {
  vendors[agent.id] = new VendedorAgent(agent.name, agent.products);
});

const Allvendors = arrayOfAgentsVendors.filter((agent) => {
  return agent.type === 'vendor';
});

const Match = new MatchAgent('match', Allvendors);
const wish = { name: 'tênis nike', price: 10 };
const wish2 = { name: 'tênis puma', price: 10 };
const wish3 = { name: 'tênis nike', price: 20 };
const Comprador = new CompradorAgent('comprador1', { money: 50 });
const Comprador2 = new CompradorAgent('comprador2', { money: 80 });
const Comprador3 = new CompradorAgent('comprador3', { money: 30 });




Comprador.tell('match', 'search')
  .tell((message, context) => {
    return wish;
  }).listen((message, context) => {
    Comprador.sale(message[0]);
    return message;
  });


Comprador2.tell('match', 'search')
  .tell((message, context) => {
    return wish2;
  }).listen((message, context) => {
    Comprador2.sale(message[0]);
    return message;
  });

Comprador3.tell('match', 'search')
  .tell((message, context) => {
    return wish3;
  }).listen((message, context) => {
    Comprador3.sale(message[0]);
    return message;
  });
