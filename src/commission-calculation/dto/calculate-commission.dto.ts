import { PickType } from '@nestjs/mapped-types';
import { CreateTransactionCommissionDto } from '../../transaction-commission/dto/create-transaction-commission.dto';

export class CalculateCommissionDto extends PickType(CreateTransactionCommissionDto, ['amount', 'client_id', 'date']) {}
