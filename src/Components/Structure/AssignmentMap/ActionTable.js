import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../Functions';
import styles from './actionTable.module.css'
import Icon from '@mdi/react';
import { mdiContentSaveEdit, mdiTrashCan } from '@mdi/js';
import Select from 'react-select';
import { selectStyles } from '../../../Styles/selectStyled';

export default function ActionTable({header = [], assingments = []}) {
  const [inspector, setInspector] = useState(null);
  const defaultOptions = { label: 'Seleccione una opción', value: null };
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers(setInspector);
  }, [])

  return (
    <>
      {
      header && (
        <table className={styles.actionTable}>
          <thead>{
            header.map(head => (
              <th key={head}>{head}</th>
            ))
          }</thead>
          <tbody>
          {assingments.map(assingment =>(
            <tr key={assingment._id}>
              <td>{assingment.formInspectionName}</td>
              <td>{assingment.status}</td>
              <td>
                <Select
                value={selectedUser ? selectedUser : defaultOptions}
                options = {
                  inspector !== null && (
                    [
                      { label: "Seleccione una opción", value: null },
                      ...inspector.map(inspector => ({label: inspector.firstName + ' '+ inspector.lastName, value: inspector._id})),
                    ]
                  )
                }
                onChange = {(selectedOption) => {
                  setSelectedUser(selectedOption);
                }}
                styles = {selectStyles}
                />
              </td>
              <td>
                <div className={styles.toolTip}>
                  <button className={styles.btnEdit}>
                    <Icon path={mdiContentSaveEdit} size={1.2} />
                    <span className={styles.toolTipText}>Editar</span>
                  </button>
                </div>
                <div className={styles.toolTip}>
                  <button className={styles.btnDel}>
                    <Icon path={mdiTrashCan} size={1.2} />
                    <span className={`${styles.toolTipText} ${styles.toolTipTextDel}`}>Borrar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )
      }
    </>
  )
}
