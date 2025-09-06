import {
  Bell,
  Plus,
  Users,
  Clock,
  MessageSquare,
  Activity,
  ChevronRight,
  Filter,
  Phone,
  Video,
} from "lucide-react";

const Dashboard = () => {
  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "Marie Dubois",
      type: "Consultation",
      status: "confirmed",
      avatar: "MD",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Jean Martin",
      type: "Suivi",
      status: "waiting",
      avatar: "JM",
    },
    {
      id: 3,
      time: "14:00",
      patient: "Sophie Laurent",
      type: "Urgence",
      status: "urgent",
      avatar: "SL",
    },
    {
      id: 4,
      time: "15:30",
      patient: "Pierre Moreau",
      type: "Consultation",
      status: "confirmed",
      avatar: "PM",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Alice Bernard",
      lastVisit: "2 jours",
      status: "Stable",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Marc Rousseau",
      lastVisit: "1 semaine",
      status: "Suivi",
      condition: "Diabète",
    },
    {
      id: 3,
      name: "Emma Leroy",
      lastVisit: "3 jours",
      status: "Amélioration",
      condition: "Migraine",
    },
  ];

  const messages = [
    {
      id: 1,
      from: "Marie Dubois",
      message: "Question sur le traitement...",
      time: "10:30",
      unread: true,
    },
    {
      id: 2,
      from: "Infirmière Sarah",
      message: "Résultats analyses prêts",
      time: "09:15",
      unread: true,
    },
    {
      id: 3,
      from: "Jean Martin",
      message: "Merci pour la consultation",
      time: "Hier",
      unread: false,
    },
  ];

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de votre activité
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Patients aujourd'hui
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
              <p className="text-sm text-green-600 mt-1">
                +2 par rapport à hier
              </p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Prochaine consultation
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">09:00</p>
              <p className="text-sm text-blue-600 mt-1">Marie Dubois</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Messages non lus
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
              <p className="text-sm text-orange-600 mt-1">Réponse requise</p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total patients
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">247</p>
              <p className="text-sm text-purple-600 mt-1">+12 ce mois</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
        {/* Rendez-vous du jour */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Rendez-vous du jour
              </h3>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">
                        {appointment.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.patient}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {appointment.time}
                      </p>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "waiting"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "Confirmé"
                          : appointment.status === "waiting"
                          ? "En attente"
                          : "Urgent"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              Messages récents
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">
                      {message.from
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">
                        {message.from}
                      </p>
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.message}
                    </p>
                    {message.unread && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-semibold py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors">
              Voir tous les messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
