// import { useRouteError } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const { t } = useTranslation();

  // const error = useRouteError();
  // console.log(error);

  const errorStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(237, 241, 242, 1)',
  };

  return (
    <div style={errorStyle}>
      <h1>{t('common.errorPageTitle')}</h1>
      <p>{t('common.errorPageContent')}</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
}
