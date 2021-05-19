# Cadastro de carro

**Requisito funcional**
- [x] Deve ser posível cadastrar um novo carro.
- [x] Deve ser possível listar todas as categorias.

**Regra de negócio**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado como disponível por padrão.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros

**Requisito funcional**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**
- [x] O usuário não precisa estar logado no sistema.


# Cadastro de especificação no carro

**Requisitos funcionais**
- [x] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

**Regra de negócio**
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**Requisitos funcionais**
- [x] Deve ser possível cadastrar a imagem do carro.

**Requisitos não funcionais**
- [x] Utilizar o multer para upload de arquivos.

**Regra de negócio**
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**Requisitos funcionais**
- [x] Deve ser possível cadastrar um aluguel.

**Regra de negócio**
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel para um carro que não está disponível.


# Devolução de carro

**Requisitos funcionais**
- [x] Deve ser possível realizar a devolução de um carro

**Regra de negócio**
- [x] Se o carro for devlvido com menos de 24 horas deverá ser cobrada a diária completa
- [x] Ao realizar a devolução o carro deve ser liberado para outro aluguel
- [x] Ao realizar a devolução o usuário deve ser liberado para outro aluguel
- [x] Ao realizar a devolução deverá ser calculado o total do aluguel
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada multa proporcional aos dias de atraso
- [x] Caso haja multa, deverá ser somada ao total do aluguel
- [x] O usuário deve estar logado na aplicação


# Recuperar senha

**Requisitos funcionais**
- [ ] Deve ser possível recuperar a senha do usuário informando o email
- [ ] O usuário deve receber um email com o passo a passo para a recuperação de senha
- [ ] O usuário deve conseguir inserir uma nova senha

**Regra de negócio**
- [ ] O usuário precisa informar uma nova senha
- [ ] o link enviado para a recuperação deve expirar em 3 horas