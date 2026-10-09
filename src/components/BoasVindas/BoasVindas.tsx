import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    const destaques = [
        "Entrega rápida",
        "Atendimento humanizado",
        "Produtos confiáveis"
    ];

    const cards = [
        { titulo: "Medicamentos", texto: "Fórmulas e soluções para bem-estar do dia a dia.", icone: "✚" },
        { titulo: "Cuidados pessoais", texto: "Higiene, beleza e cuidado que você confia.", icone: "✦" },
        { titulo: "Suplementos", texto: "Vitamina e saúde em uma rotina mais equilibrada.", icone: "❋" }
    ];

    return (
        <section style={{
            padding: '58px 18px 30px',
            background: 'linear-gradient(180deg, #f3fff9 0%, #eef8ff 100%)'
        }}>
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: 28,
                alignItems: 'center'
            }}>
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#eafaf1',
                        border: '1px solid rgba(29, 154, 100, 0.18)',
                        color: '#0f766e',
                        borderRadius: 999,
                        padding: '8px 14px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase'
                    }}>
                        Farmácia didática • saúde & bem-estar
                    </div>

                    <h1 style={{
                        margin: '22px 0 16px',
                        color: '#103b2f',
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        lineHeight: 1.04,
                        fontWeight: 900,
                        letterSpacing: '-0.06em'
                    }}>
                        Sua saúde em <span style={{ color: '#1d9a64' }}>melhores mãos</span>
                    </h1>

                    <p style={{
                        margin: '0 0 24px',
                        maxWidth: 680,
                        fontSize: '1.08rem',
                        lineHeight: 1.7,
                        color: '#3e5f54'
                    }}>
                        A <strong>+farmacia</strong> combina cuidado, qualidade e tecnologia para entregar remédios, suplementos e atendimento com segurança, agilidade e atenção pessoal.
                    </p>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
                        <button type="button" style={{
                            border: 'none',
                            background: 'linear-gradient(135deg, #1d9a64 0%, #2eb67a 100%)',
                            color: '#fff',
                            padding: '0.9rem 1.4rem',
                            borderRadius: 14,
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: '0 14px 28px rgba(29, 154, 100, 0.25)'
                        }}>
                            Ver catálogo
                        </button>
                        <button type="button" style={{
                            border: '1px solid rgba(16, 59, 47, 0.14)',
                            background: '#fff',
                            color: '#103b2f',
                            padding: '0.9rem 1.4rem',
                            borderRadius: 14,
                            fontWeight: 800,
                            cursor: 'pointer'
                        }}>
                            Falar conosco
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                        {destaques.map((item) => (
                            <span key={item} style={{
                                background: '#fff',
                                color: '#295c4b',
                                border: '1px solid rgba(16, 59, 47, 0.08)',
                                borderRadius: 999,
                                padding: '8px 12px',
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)'
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(160deg, #103b2f 0%, #1d9a64 100%)',
                    borderRadius: 28,
                    padding: 28,
                    color: '#fff',
                    boxShadow: '0 30px 60px rgba(16, 59, 47, 0.22)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 18, right: 18, fontSize: 52, opacity: 0.18 }}>✚</div>
                    <div style={{ position: 'absolute', bottom: 16, left: 18, fontSize: 38, opacity: 0.12 }}>⚕</div>

                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 20,
                        padding: '18px 20px',
                        backdropFilter: 'blur(6px)'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6f7ea' }}>
                            Hoje em destaque
                        </p>
                        <h3 style={{ margin: '10px 0 12px', fontSize: '2rem', lineHeight: 1.2 }}>Cuidado com qualidade</h3>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 12 }}>
                                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#d9f7eb' }}>Promoção</strong>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>20% OFF</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 12 }}>
                                <strong style={{ display: 'block', fontSize: '0.8rem', color: '#d9f7eb' }}>Entrega</strong>
                                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Em até 30 minutos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                maxWidth: 1200,
                margin: '32px auto 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 20
            }}>
                {cards.map((card) => (
                    <article key={card.titulo} style={{
                        background: '#fff',
                        border: '1px solid rgba(16, 59, 47, 0.08)',
                        borderRadius: 22,
                        padding: 22,
                        boxShadow: '0 18px 34px rgba(15, 23, 42, 0.05)'
                    }}>
                        <div style={{
                            width: 52,
                            height: 52,
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #dffbf0 0%, #eaf6ff 100%)',
                            color: '#0f766e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginBottom: 16
                        }}>
                            {card.icone}
                        </div>
                        <h3 style={{ margin: '0 0 8px', color: '#103b2f', fontSize: '1.35rem' }}>{card.titulo}</h3>
                        <p style={{ margin: 0, lineHeight: 1.7, color: '#507067' }}>{card.texto}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default BoasVindas;