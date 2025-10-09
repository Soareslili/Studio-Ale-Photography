import Desfile from '../assets/Desfile.png'
import Infantil from '../assets/AniversarioInfantil.png'
import Batizado from '../assets/Batizado.png'
import Casamento from '../assets/Casamento.png'
import Evento from '../assets/Evento.png'
import Familia from '../assets/Familia.png'
import Festa from '../assets/Festa15anos.png'
import Nascimento from '../assets/Nascimento.png'




const Portfolio = () => {

    const Projetos = [
        { img: Desfile, title: 'Ver trabalho' },
        { img: Infantil, title: 'Ver trabalho' },
        { img: Batizado, title: 'Ver trabalho' },
        { img: Casamento, title: 'Ver trabalho' },
        { img: Evento, title: 'Ver trabalho' },
        { img: Familia, title: 'Ver trabalho' },
        { img: Festa, title: 'Ver trabalho' },
        { img: Nascimento, title: 'Ver trabalho' },
    ]

    return (
        <section id='Portfolio' className='py-20 bg-[#121317]'>
            <div className='container mx-auto h-full px-4'>
                <div className='text-center mb-20'>
                    <h2 className='text-4xl md:text-5xl font-display font-bold text-white mb-6'>
                        Selected <span className='text-[#C8A24A]'>Work</span>
                    </h2>
                    <p className='text-lg text-white mb-6 leading-relaxed'>Uma coleção com curadoria dos meus melhores trabalhos, abrangendo casamentos, retratos, sessões editoriais e projetos comerciais.</p>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                    {Projetos.map(({ img, title }, i) => (
                        <div
                            key={i}
                            className='relative group rounded-lg overflow-hidden shadow-lg cursor-pointer'
                            data-aos="zoom-in"
                            data-aos-delay={`${100 * (i + 1)}`}
                            data-aos-duration="1200"
                        >
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-84 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-lg font-semibold mt-[70%]">{title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Portfolio;