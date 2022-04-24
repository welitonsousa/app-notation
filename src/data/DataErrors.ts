import { IQuestion } from "src/models/modelQuestion";

const errors: IQuestion[] = [
  {
    title: 'Como recuperar minha senha?',
    content: [
      'Vá para a tela de login, e em seguida clique em "esqueci minha senha"',
      'Então, você será  direcionado para uma tela de 3 passos para recuperar sua conta',
      'No primeiro passo, insira seu email cadastrado',
      'No segundo passo, insira o código único recebido no email de cadastro.',
      'No terceiro passo, insira a nova senha e confirme-a. Pronto, sua senha foi alterada para a nova senha.',
    ]
  },
  {
    title: 'Como alterar minha imagem de perfil?',
    content: [
      'Para alterar sua imagem de perfil, é necessário estar logado no sistema.',
      'Depois de estar autenticado no App Notation, você poderá ver um botão de configurações.',
      'Clicando no botão de configurações, será expandido um menu com outros botões para algumas ações que poder ser feitas pela sua conta. Nestes menu, você encontrará uma opção chamada "Alterar Imagem".',
      'Clicando no botão "Alterar imagem", logo em seguida seu explorador de arquivos será aberto, então escolha uma foto de sua preferencia.'
    ]
  },
  {
    title: 'Como criar uma nota?',
    content: [
      'Após realizar o login, clique no botão localizado no canto inferior direito.',
      'Uma caixa de texto se abrirá, na qual você deve digitar o título e o corpo da nota.',
      'Então, clique em salvar.',
      'Pronto, sua nota já está salva.'
    ]
  },
  {
    title: 'Como excluir uma nota?',
    content: [
      'Clique na nota que deseja excluir.',
      'Aperte o botão "DELETAR"',
      'Pronto, sua nota foi deletada.',
    ]
  },
  {
    title: 'Salvei uma nota, porque não estou vendo ela?',
    content: [
      'Há uma quantidade de notas visíveis por páginas, na direita da tela, você pode acessar todas as páginas disponíveis por meio das setinhas.',
      'Verifique se você não está realizando uma pesquisa por um texto que não contém na nota que está procurando. Para solucionar isso, só apagar o texto no campo de busca.',
    ]
  },
  {
    title: 'Como alterar a senha?',
    content: [
      'Vá em configurações no canto superior direito. Clique em alterar senha.',
      'Na tela que abre, insira a senha antiga, a nova senha, e confirme a nova senha.',
      'Se desejar desconectar todos os dispositivos logados em sua conta, marque a opção "Desconectar todos os dispositivos"',
      'Em seguida, clique em confirmar. Pronto, sua senha foi alterada.',
    ]
  },{
    title: 'Como editar uma nota?',
    content: [
      'Clique na nota que deseja editar.',
      'Altere da maneira que preferir e aperte o botão "SALVAR". Pronto, sua nota foi atualizada.',
    ]
  },
]

export {errors}
