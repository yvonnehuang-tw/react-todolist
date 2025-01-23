import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      &copy; {t('common.footer')}
    </footer>
  );
}

export default Footer;