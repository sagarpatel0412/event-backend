import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DataStatusService } from './data-status.service';
import { CreateDataStatusInput } from './dto/create-data-status.input';
import { UpdateDataStatusInput } from './dto/update-data-status.input';
import { DataStatusModel } from './model/data-status.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => DataStatusModel)
export class DataStatusResolver {
  constructor(private readonly dataStatusService: DataStatusService) {}

  @AllowUnauthorized()
  @Mutation(() => DataStatusModel)
  createDataStatus(
    @Args('createDataStatusInput') createDataStatusInput: CreateDataStatusInput,
  ) {
    return this.dataStatusService.createDataStatus(createDataStatusInput);
  }

  @AllowUnauthorized()
  @Query(() => [DataStatusModel])
  getDataStatuses() {
    return this.dataStatusService.getDataStatuses();
  }

  @AllowUnauthorized()
  @Query(() => DataStatusModel)
  getDataStatus(@Args('id') id: string) {
    return this.dataStatusService.getDataStatus(id);
  }

  @AllowUnauthorized()
  @Mutation(() => DataStatusModel)
  updateDataStatus(
    @Args('id') id: string,
    @Args('updateDataStatusInput') updateDataStatusInput: UpdateDataStatusInput,
  ) {
    return this.dataStatusService.updateDataStatus(id, updateDataStatusInput);
  }

  @AllowUnauthorized()
  @Mutation(() => DataStatusModel)
  deleteDataStatus(@Args('id') id: string) {
    return this.dataStatusService.deleteDataStatus(id);
  }
}
