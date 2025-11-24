import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="container-max py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {t("footer.brand_name")}</p>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="https://twitter.com" target="_blank" rel="noreferrer"> {t("footer.twitter")}</a>
          <a className="hover:underline" href="https://github.com" target="_blank" rel="noreferrer">{t("footer.github")}</a>
          <a className="hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">{t("footer.linkedin")}</a>
        </div>
      </div>
    </footer>
  );
}
