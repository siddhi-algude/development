import withPageTitle from "../hoc/withPageTitle";
import Button from "../components/Button";

function ContactPage() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <p className="text-gray-700">Have a question? Reach out via any of the social links in the footer.</p>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
        <input className="input" placeholder="Your email" />
        <textarea className="input" rows="4" placeholder="Message" />
        <Button>Send</Button>
      </form>
    </div>
  );
}

export default withPageTitle(ContactPage, "ShopLite · Contact");
