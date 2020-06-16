import React, {useState} from 'react';

export default function FolderChooser() {
    const [folderPath, setFolderPath] = useState("");

    return (
        <div>
            Folder: {folderPath}
        </div>
    )
}