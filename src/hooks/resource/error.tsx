//
//  error.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import { Awaitable } from '@o2ter/utils-js';
import { ComponentType, PropsWithChildren, SetStateAction } from '../../core/types/common';
import { createContext } from '../../core/types/context';
import { useContext } from '../../core/hooks/context';
import { useState } from '../../core/hooks/state';
import { useMemo } from '../../core/hooks/memo';

type Errors = {
  token: string;
  error: any;
  refresh: () => Awaitable<void>;
  refreshing: boolean;
  loading: boolean;
}[];

export const Context = createContext<{
  errors: Errors;
  setErrors: (values: SetStateAction<Errors>) => void;
}>({
  errors: [],
  setErrors: () => { },
});

/**
 * A context provider component for managing asynchronous resource errors.
 * 
 * This component provides a shared context for tracking errors encountered during
 * asynchronous operations. It allows child components to access and manage these errors
 * using the `useResourceErrors` hook.
 * 
 * ### Usage:
 * Wrap your application or specific parts of it with this component to enable error tracking:
 * 
 * ```tsx
 * <ResourceErrors>
 *   <YourComponent />
 * </ResourceErrors>
 * ```
 * 
 * @param children - The child components that will have access to the error context.
 * 
 * @returns A context provider that wraps the provided children.
 */
export const ResourceErrors: ComponentType<PropsWithChildren<{}>> = ({
  children
}) => {
  const [errors, setErrors] = useState<Errors>([]);
  const value = useMemo(() => ({ errors, setErrors }), [errors, setErrors]);
  return (
    <Context value={value}>{children}</Context>
  );
}

/**
 * A custom hook to access the list of asynchronous resource errors.
 * 
 * This hook allows components to retrieve the current list of errors being tracked
 * in the `ResourceErrors` context. It must be used within a component that is
 * a descendant of the `ResourceErrors` provider.
 * 
 * ### Usage:
 * ```tsx
 * const errors = useResourceErrors();
 * 
 * errors.forEach(({ token, error, refresh }) => {
 *   console.error(`Error [${token}]:`, error);
 *   // Optionally call refresh() to retry the operation
 * });
 * ```
 * 
 * @returns The list of errors currently being tracked in the context. Each error includes:
 * - `token`: A unique identifier for the error.
 * - `error`: The error object or message.
 * - `refresh`: A function to retry the operation that caused the error.
 */
export const useResourceErrors = () => useContext(Context).errors;
