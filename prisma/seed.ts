import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = [
    {
      tipoInteligencia: 'Inteligência Linguística',
      texto:
        'Quando você lê um texto sobre um assunto do seu interesse, como ciência ou tecnologia, você consegue entender rapidamente a ideia principal e os detalhes importantes?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Linguística',
      texto:
        'Você gosta de escrever textos, como histórias, redações ou artigos para o jornal da escola, e frequentemente recebe elogios pela clareza e criatividade de suas ideias?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Linguística',
      texto:
        'Você sente facilidade em explicar suas ideias de maneira clara e eficaz quando participa de debates ou apresentações em grupo, mesmo em temas complexos?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Linguística',
      texto:
        'Você tem interesse em aprender novas palavras, conceitos ou mesmo novas línguas, e frequentemente utiliza esse conhecimento em suas conversas diárias ou atividades escolares?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Lógico-Matemática',
      texto:
        'Você gosta de resolver quebra-cabeças, enigmas ou problemas de lógica que desafiam seu pensamento crítico e raciocínio lógico?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Lógico-Matemática',
      texto:
        'Você sente facilidade e interesse em trabalhar com números, fórmulas matemáticas, e cálculos, como em aulas de matemática ou física?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Lógico-Matemática',
      texto:
        'Você consegue identificar padrões em gráficos, tabelas ou em situações do cotidiano, e gosta de prever o que acontecerá a seguir com base nessas informações?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Lógico-Matemática',
      texto:
        'Você se interessa por assuntos de tecnologia e ciência, como computação, engenharia, robótica, ou programação, e gosta de entender como as coisas funcionam por trás dos conceitos teóricos?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Espacial',
      texto:
        'Você consegue imaginar facilmente como seria um ambiente ou um objeto mesmo sem vê-lo, visualizando cada detalhe em sua mente?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Espacial',
      texto:
        'Você gosta de desenhar, pintar ou criar designs, e frequentemente percebe que tem facilidade em visualizar e criar imagens, formas ou padrões em sua mente?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Espacial',
      texto:
        'Você se orienta bem em locais desconhecidos, conseguindo lembrar-se de rotas, mapas e locais visitados anteriormente, mesmo que tenha passado pouco tempo lá?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Espacial',
      texto:
        'Você sente prazer em montar quebra-cabeças, construir maquetes, ou criar modelos tridimensionais (físicos ou digitais), usando sua habilidade de visualizar como as peças se encaixam?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Musical',
      texto:
        'Você se sente atraído por sons e ritmos diferentes, como o som da chuva, batidas musicais ou ritmos urbanos, e gosta de reproduzi-los batendo os pés ou os dedos?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Musical',
      texto:
        'Você tem vontade de aprender a tocar um instrumento musical (como violão, piano, ou bateria) e sente que tem facilidade para entender o funcionamento desses instrumentos?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Musical',
      texto:
        'Você consegue memorizar facilmente letras e melodias de músicas e costuma cantarolar ou assobiar suas músicas favoritas durante o dia?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Musical',
      texto:
        'Você já experimentou compor sua própria música ou criar novas melodias, seja tocando um instrumento, escrevendo letras ou utilizando aplicativos de música?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Corporal-Cinestésica',
      texto:
        'Você gosta de praticar esportes ou atividades físicas (como dança, atletismo ou artes marciais) e sente que aprende rapidamente novos movimentos ou técnicas?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Corporal-Cinestésica',
      texto:
        'Você costuma ser elogiado pela sua habilidade de coordenação, equilíbrio e controle corporal, seja em esportes, dança, ou mesmo ao realizar tarefas cotidianas que exigem precisão?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Corporal-Cinestésica',
      texto:
        'Você sente que aprende melhor quando pode movimentar-se ou tocar nos objetos, como em aulas práticas, laboratórios ou em demonstrações físicas?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Corporal-Cinestésica',
      texto:
        'Você se sente à vontade para se expressar fisicamente, seja em apresentações de dança, teatro, ou ao demonstrar algo para outras pessoas?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Interpessoal',
      texto:
        'Você consegue perceber facilmente quando alguém próximo está triste, ansioso ou chateado, e sente vontade de ajudar ou oferecer apoio?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Interpessoal',
      texto:
        'Você sente facilidade para se conectar com novas pessoas, fazer amizades e manter um bom relacionamento com seus colegas, professores e conhecidos?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Interpessoal',
      texto:
        'Você prefere trabalhar em equipe ou em grupos, onde possa colaborar, trocar ideias e aprender com os outros?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Interpessoal',
      texto:
        'Você é frequentemente escolhido por amigos ou colegas para ajudar a resolver conflitos ou discutir mal-entendidos, porque percebe que consegue lidar bem com essas situações?',
      ordem: 4,
    },
    {
      tipoInteligencia: 'Inteligência Intrapessoal',
      texto:
        'Você consegue identificar e compreender suas próprias emoções com facilidade, sabendo o que está sentindo e por que está se sentindo assim?',
      ordem: 1,
    },
    {
      tipoInteligencia: 'Inteligência Intrapessoal',
      texto:
        'Você costuma refletir sobre seus objetivos de vida, o que deseja alcançar, e as ações necessárias para alcançar esses objetivos?',
      ordem: 2,
    },
    {
      tipoInteligencia: 'Inteligência Intrapessoal',
      texto:
        'Você consegue aprender com suas próprias experiências, analisando o que deu certo e o que poderia ter sido feito de maneira diferente?',
      ordem: 3,
    },
    {
      tipoInteligencia: 'Inteligência Intrapessoal',
      texto:
        'Você está ciente de suas principais qualidades e habilidades, assim como das áreas onde sente que precisa melhorar?',
      ordem: 4,
    },
  ];

  for (const question of questions) {
    await prisma.question.create({
      data: question,
    });
  }

  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
