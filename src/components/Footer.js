import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      &copy; {t('common.footer')}
    </footer>
  );
}
