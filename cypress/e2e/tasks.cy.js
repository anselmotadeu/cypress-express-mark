/// <reference types="cypress" />

//import {faker} from '@faker-js/faker'
describe('tarefas', () => {

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro de Node.js'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')

        })

        it('não deve permitir tarefa duplicada', () => {

            const task = {
                name: 'Estudar JavaScript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.contains('Task already exists!')
                .should('be.visible')

        })

        it('campo obrigatório', () => {
            cy.createTask()

            cy.isRequired('This is a required field')

        });
    });

    context('atualização', () => {
        it('deve concluir uma terefa', () => {
            const task = {
                name: 'Lead - Teste',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        });
    });

    context('exclusão', () => {
        it('deve concluir uma terefa', () => {
            const task = {
                name: 'Estudar JavaScript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        });
    });

});