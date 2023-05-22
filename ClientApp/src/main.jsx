import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'react-auth-kit';
import { Suspense } from 'react';
import {apkioskTheme} from "./Style/apkioskTheme.jsx";
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <QueryClientProvider client={queryClient}>

          <Suspense fallback="...is loading">

              <AuthProvider authType = {'localstorage'}
                            authName={'_auth'}>

                  <ChakraProvider theme={apkioskTheme}>

                      <BrowserRouter>
                              <App />
                              {/* <ReactQueryDevtools/> */}
                      </BrowserRouter>

                  </ChakraProvider>

              </AuthProvider>

          </Suspense>

      </QueryClientProvider>

  </React.StrictMode>,
)
