import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactFromService } from './contact-from.service';
import { CreateContactFromInput } from './dto/create-contact-from.input';
import { UpdateContactFromInput } from './dto/update-contact-from.input';
import { ContactFormModel } from './model/contact-form.model';
import { AllowUnauthorized } from '../auth/decorators/allow-unauthorized.decorator';

@Resolver(() => ContactFormModel)
export class ContactFromResolver {
  constructor(private readonly contactFromService: ContactFromService) {}

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  createContactFrom(
    @Args('createContactFromInput')
    createContactFromInput: CreateContactFromInput,
  ) {
    return this.contactFromService.createContactForm(createContactFromInput);
  }

  @AllowUnauthorized()
  @Query(() => [ContactFormModel])
  getContactForms() {
    return this.contactFromService.getContactForms();
  }

  @AllowUnauthorized()
  @Query(() => ContactFormModel)
  getContactForm(@Args('id') id: string) {
    return this.contactFromService.getContactForm(id);
  }

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  updateContactFrom(
    @Args('id') id: string,
    @Args('updateContactFromInput')
    updateContactFromInput: UpdateContactFromInput,
  ) {
    return this.contactFromService.updateContactForm(
      id,
      updateContactFromInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => ContactFormModel)
  deleteContactForm(@Args('id') id: string) {
    return this.contactFromService.deleteContactForm(id);
  }
}
