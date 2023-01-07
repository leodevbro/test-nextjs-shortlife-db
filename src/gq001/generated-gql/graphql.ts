import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Dog = {
  __typename?: 'Dog';
  ageInWeeks: Scalars['Float'];
  attributes: Array<DogAttribute>;
  availableDate: Scalars['String'];
  breed: Scalars['String'];
  color: Scalars['String'];
  description: Array<Scalars['String']>;
  fee: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['ID'];
  sex: Scalars['String'];
  weight: Scalars['Float'];
};

export type DogAttribute = {
  __typename?: 'DogAttribute';
  key: Scalars['ID'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dog?: Maybe<Dog>;
  dogs: Array<Dog>;
};


export type QueryDogArgs = {
  name: Scalars['String'];
};


export type QueryDogsArgs = {
  dogLimit: Scalars['Int'];
};

export type GetDogsQueryVariables = Exact<{
  dogLimit: Scalars['Int'];
}>;


export type GetDogsQuery = { __typename?: 'Query', dogs: Array<{ __typename?: 'Dog', name: string, availableDate: string }> };

export type GetOneDogQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetOneDogQuery = { __typename?: 'Query', dog?: { __typename?: 'Dog', name: string, breed: string } | null };


export const GetDogsDocument = gql`
    query getDogs($dogLimit: Int!) {
  dogs(dogLimit: $dogLimit) {
    name
    availableDate
  }
}
    `;
export const GetOneDogDocument = gql`
    query getOneDog($name: String!) {
  dog(name: $name) {
    name
    breed
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getDogs(variables: GetDogsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogsQuery>(GetDogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogs', 'query');
    },
    getOneDog(variables: GetOneDogQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOneDogQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOneDogQuery>(GetOneDogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOneDog', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;