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
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

**Regra de negócio**
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**Requisitos funcionais**
- [ ] Deve ser possível cadastrar a imagem do carro.
- [ ] Deve ser possível listar todos os carros.

**Requisitos não funcionais**
- [ ] Utilizar o multer para upload de arquivos.

**Regra de negócio**
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**Requisitos funcionais**
- [ ] Deve ser possível cadastrar um aluguel.

**Regra de negócio**
- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel para um carro que não está disponível.