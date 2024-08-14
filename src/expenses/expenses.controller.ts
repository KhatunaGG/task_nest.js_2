import { Body, Controller, Delete, Get,  Param,  ParseIntPipe,  Post, Put } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { IExpenseDto } from './expense.dto';
import { IExpenses } from './expenses.interface';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesServise: ExpensesService) {}

    @Get()
    getAllExpenses(){
        return this.expensesServise.getAllExpenses()
    }


    @Post()
    createExpense(@Body() body: IExpenseDto) {
        return this.expensesServise.createExpense(body)
    }

    @Get('/:id')
    getExpenseById(@Param('id', ParseIntPipe) id) {
        return this.expensesServise.getExpenseById(id)
    }

    @Put('/:id')
    updateExpense(@Param('id', ParseIntPipe) id, @Body() body) {
        return this.expensesServise.updateExpense(id, body)
    }


    @Delete('/:id')
    deleteExpense(@Param('id', ParseIntPipe) id) {
        return this.expensesServise.deleteExpense(id)
    }
    
}
