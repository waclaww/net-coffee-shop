import React, { useState } from 'react'
import { MainScreen } from "../../../shared/components/screen/screen.component";
import { FileUploader } from "react-drag-drop-files";

export function Products () {

    return (
        <MainScreen>
            <div>
                <a href='/admin/products/add'>Добавление товаров</a>
            </div>
        </MainScreen>
    )
}