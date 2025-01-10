import { FaUsers, FaWallet, FaCalendarCheck, FaEnvelope } from "react-icons/fa";

export default function Cards() {
  const cardsData = [
    { icon: <FaUsers size={24} />, label: "Total Clients", value: "1,245" },
    { icon: <FaWallet size={24} />, label: "Account Balance", value: "$12,345" },
    { icon: <FaCalendarCheck size={24} />, label: "New Bookings", value: "245" },
    { icon: <FaEnvelope size={24} />, label: "Pending Contacts", value: "89" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-white rounded-lg shadow-md"
        >
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            {card.icon}
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-semibold">{card.label}</h4>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
