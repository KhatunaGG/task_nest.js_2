import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExpenses } from './expenses.interface';
import { IExpenseDto } from './expense.dto';


@Injectable()
export class ExpensesService {
    private expenses: IExpenses[] = [{ id: 1, name: 'nika', category: 'qqq', price: 20, createdAt: new Date().toISOString() }, { id: 2, name: 'dato', category: 'www', price: 10, createdAt: new Date().toISOString() }]

    getAllExpenses(): IExpenses[] {
        return this.expenses
    }


    createExpense(body: IExpenseDto): IExpenses {
        if (!body.name || !body.category || !body.price) throw new HttpException('Category, name and cost required', HttpStatus.BAD_REQUEST)
        const lastId = this.expenses[this.expenses.length - 1]?.id || 0
        const newExpense = {
            ...body,
            id: lastId + 1,
            createdAt: new Date().toISOString()
        }
        this.expenses.push(newExpense)
        return newExpense
    }


    getExpenseById(id: number): IExpenses {
        const expense = this.expenses.find(el => el.id === id)
        if (!expense) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        return expense
    }

    updateExpense(id: number, body: IExpenseDto): IExpenses {
        const index = this.expenses.findIndex(el => el.id === id)
        if (index === -1) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        const updateExpense = {
            ...this.expenses[index],
            ...body
        }
        this.expenses[index] = updateExpense
        return updateExpense
    }

    deleteExpense(id: number): IExpenses[] {
        const index = this.expenses.findIndex(el => el.id === id)
        if(index === -1) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        const deleidExpense = this.expenses.splice(index, 1)
        return deleidExpense

    }




}
