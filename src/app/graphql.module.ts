import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

@NgModule({
  exports: [HttpClientModule, ApolloModule],
})
export class GraphQLModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const uri = environment?.qraphqlUri;
    const defaultOptions: DefaultOptions = {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
      },
    };

    apollo.createNamed('rentrateClient', {
      defaultOptions,
      uri,
      cache: new InMemoryCache(),
    });
  }
}
