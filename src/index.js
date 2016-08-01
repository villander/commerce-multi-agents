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
const Comprador = new CompradorAgent('comprador1', { money: 50 });

Comprador.tell('match', 'search')
  .tell((message, context) => {
    return wish;
  }).listen((message, context) => {
    Comprador.sale(message);
    return message;
  });
