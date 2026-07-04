// Cardápio completo da casa — consumido por CardapioCompleto.tsx.
// Preços em BRL como string (mantém o "R$" junto do número no layout dot-leader).

export interface CardapioItem {
  name: string
  price: string
}

export interface CardapioCategoria {
  /** número da categoria exibido em Anton ("01".."04") */
  n: string
  nome: string
  itens: CardapioItem[]
}

export const CARDAPIO: CardapioCategoria[] = [
  {
    n: '01',
    nome: 'ESPRESSO BAR',
    itens: [
      { name: 'Espresso', price: 'R$ 8' },
      { name: 'Espresso duplo', price: 'R$ 10' },
      { name: 'Ristretto', price: 'R$ 8' },
      { name: 'Cortado', price: 'R$ 10' },
      { name: 'Macchiato', price: 'R$ 10' },
      { name: 'Cappuccino', price: 'R$ 13' },
      { name: 'Latte', price: 'R$ 14' },
      { name: 'Flat white', price: 'R$ 15' },
      { name: 'Mocha', price: 'R$ 16' },
    ],
  },
  {
    n: '02',
    nome: 'COADOS',
    itens: [
      { name: 'V60', price: 'R$ 18' },
      { name: 'Aeropress', price: 'R$ 17' },
      { name: 'Prensa francesa', price: 'R$ 16' },
      { name: 'Coado da casa — grão do dia', price: 'R$ 10' },
    ],
  },
  {
    n: '03',
    nome: 'GELADOS',
    itens: [
      { name: 'Cold brew', price: 'R$ 16' },
      { name: 'Cold brew tônica', price: 'R$ 19' },
      { name: 'Espresso tônica', price: 'R$ 18' },
      { name: 'Latte gelado', price: 'R$ 16' },
      { name: 'Affogato', price: 'R$ 18' },
    ],
  },
  {
    n: '04',
    nome: 'PRA COMER',
    itens: [
      { name: 'Pão de queijo', price: 'R$ 9' },
      { name: 'Croissant de manteiga', price: 'R$ 12' },
      { name: 'Croissant de amêndoas', price: 'R$ 16' },
      { name: 'Banana bread', price: 'R$ 11' },
      { name: 'Bolo de fubá com goiabada', price: 'R$ 12' },
      { name: 'Cookie de chocolate', price: 'R$ 10' },
      { name: 'Tostado de queijo e presunto', price: 'R$ 18' },
      { name: 'Basque cheesecake', price: 'R$ 16' },
    ],
  },
]
