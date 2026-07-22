function StatCard( { title, value, icon}) {
    return (
        <div className="dashboard-card">
            <div>
                <h4>{title}</h4>
                <h2>{value}</h2>
            </div>
            {icon}
        </div>
    );
}

export default StatCard;