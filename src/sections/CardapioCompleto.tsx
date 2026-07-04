import { RevealText } from '../components/RevealText'
import { CARDAPIO } from '../data/cardapio'

/**
 * Cardápio completo — sub-bloco de #menu, entra depois das 4 faixas de
 * destaque. Fundo #120d09 sem mídia; layout dot-leader alinhado por baseline.
 */
export function CardapioCompleto() {
  return (
    <div style={{ background: '#120d09' }}>
      {/* Linha divisória do topo do bloco */}
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(201,151,63,0.6), rgba(201,151,63,0.05))',
        }}
      />

      <div
        style={{
          padding:
            'clamp(56px,9vh,110px) clamp(20px,5vw,72px) clamp(8px,2vh,20px)',
        }}
      >
        {/* Cabeçalho do bloco */}
        <div
          className="flex flex-wrap items-end justify-between"
          style={{ gap: '20px 44px' }}
        >
          <div>
            <div
              className="flex items-center gap-3"
              style={{ marginBottom: 'clamp(16px, 2vw, 26px)' }}
            >
              <span
                aria-hidden="true"
                style={{ width: 30, height: 1, background: 'var(--color-gold)' }}
              />
              <span
                className="font-text text-gold uppercase"
                style={{ fontWeight: 600, fontSize: 9.5, letterSpacing: '0.34em' }}
              >
                02 · CARDÁPIO COMPLETO
              </span>
            </div>

            <RevealText
              as="h3"
              className="font-display text-cream"
              style={{
                fontSize: 'clamp(36px, 4.8vw, 88px)',
                lineHeight: 0.96,
                letterSpacing: '-0.015em',
              }}
            >
              TUDO O QUE
              <br />
              SERVIMOS.
            </RevealText>
          </div>

          <RevealText
            as="p"
            delay={120}
            className="font-text"
            style={{
              maxWidth: 300,
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.75,
              color: 'rgba(242,236,225,0.62)',
            }}
          >
            Bebidas preparadas com o blend da casa ou com o grão do dia. Todas as
            bebidas têm opção com leite de aveia.
          </RevealText>
        </div>

        {/* Grid de categorias */}
        <div
          style={{
            marginTop: 'clamp(44px, 7vh, 72px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(272px, 1fr))',
            gap: 'clamp(40px,7vh,64px) clamp(44px,6vw,92px)',
          }}
        >
          {CARDAPIO.map((cat, i) => (
            <RevealText key={cat.n} delay={i * 110}>
              {/* Cabeçalho da categoria */}
              <div
                className="flex items-baseline justify-between"
                style={{
                  borderBottom: '1px solid rgba(242,236,225,0.16)',
                  paddingBottom: 14,
                }}
              >
                <span
                  className="font-text text-gold uppercase"
                  style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.3em' }}
                >
                  {cat.nome}
                </span>
                <span
                  className="font-display"
                  style={{ fontSize: 13, color: 'rgba(242,236,225,0.35)' }}
                >
                  {cat.n}
                </span>
              </div>

              {/* Itens */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {cat.itens.map((item) => (
                  <li
                    key={item.name}
                    className="cardapio-item flex items-baseline"
                    style={{ gap: 14, padding: '10px 0' }}
                  >
                    <span
                      className="font-text"
                      style={{ fontSize: 14, color: 'rgba(242,236,225,0.88)' }}
                    >
                      {item.name}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 1,
                        borderBottom: '1px dotted rgba(242,236,225,0.22)',
                        transform: 'translateY(-3px)',
                      }}
                    />
                    <span
                      className="font-text text-gold"
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: '0.12em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealText>
          ))}
        </div>
      </div>
    </div>
  )
}
