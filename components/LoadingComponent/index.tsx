import React from 'react'
import { Spinner } from '../Spinner'


export const LoadingComponent = () => {
    return (
        <div className="flex items-center flex-col mt-40">
            <Spinner color={"black"} width="100" height="100" />
            <div className="mt-8">Loading</div>
        </div>
    )
}
