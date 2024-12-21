import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, address, postalCode, email } = req.body;

  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = "your-brevo-api-key";

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let contact = new SibApiV3Sdk.CreateContact();
  contact.email = email;
  contact.attributes = {
    NAME: name,
    PHONE: phone,
    ADDRESS: address,
    POSTAL_CODE: postalCode,
  };
  contact.listIds = [your_list_id]; // Replace with your Brevo list ID

  try {
    await apiInstance.createContact(contact);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
