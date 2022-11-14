import { Table } from 'react-bootstrap';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function UserTable({
  userData,
  onTableCheckedAll,
  onChangeDeleteBtnDisable,
}) {
  const { t } = useTranslation();

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleTableCheckedAll = tmpChecked => {
    setIsCheckedAll(tmpChecked);
    onTableCheckedAll(tmpChecked);
  };

  const handleTableChecked = tmpUser => {
    const isUserData = userData.map(user => {
      if (user.id === tmpUser.id) {
        return tmpUser;
      } else {
        return user;
      }
    });

    // if (isUserData.every((item) => item.checked)) {
    //   setIsCheckedAll(true);
    // } else {
    //   setIsCheckedAll(false);
    // }
    setIsCheckedAll(isUserData.every(item => item.checked) ? true : false);

    onChangeDeleteBtnDisable(isUserData);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: 40, textAlign: 'center' }}>
            <input
              type="checkbox"
              onChange={e => handleTableCheckedAll(e.target.checked)}
              checked={isCheckedAll}
            />
          </th>
          <th style={{ width: 40, textAlign: 'center' }}>#</th>
          <th>{t('table.tableName')}</th>
          <th>{t('table.tableEmail')}</th>
          <th>{t('table.tableJob')}</th>
          <th>{t('table.tableAddress')}</th>
          <th>{t('table.tableCountry')}</th>
        </tr>
      </thead>
      <tbody>
        {userData.map(user => {
          return (
            <tr key={user.id}>
              <td style={{ width: 40, textAlign: 'center' }}>
                <input
                  type="checkbox"
                  onChange={e =>
                    handleTableChecked({ ...user, checked: e.target.checked })
                  }
                  checked={user.checked}
                />
              </td>
              <td style={{ width: 40, textAlign: 'center' }}>{user.id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.job}</td>
              <td>{user.address}</td>
              <td>{user.country}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
