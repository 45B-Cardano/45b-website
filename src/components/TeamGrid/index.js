import {
  BsDiscord,
  BsLinkedin,
  BsTelegram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import styles from "./styles.module.css";

const TeamGrid = ({ teamMembers = [] }) => {
  return (
    <div className={styles.teamGrid}>
      {teamMembers.map((member) => (
        <div className={styles.teamMember}>
          <img src={member.photo} alt="Team Member 1" />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
          <div>
            <div className={styles.socialLinks}>
              {member.whatsapp && (
                <a
                  href={`https://api.whatsapp.com/send/?phone=${member.whatsapp}&text&type=phone_number&app_absent=0`}
                  target="_blank"
                >
                  <BsWhatsapp />
                </a>
              )}
              {member.linkedIn && (
                <a href={member.linkedIn} target="_blank">
                  <BsLinkedin />
                </a>
              )}
              {member.telegram && (
                <a href={member.telegram} target="_blank">
                  <BsTelegram />
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} target="_blank">
                  <BsTwitter />
                </a>
              )}
              {member.discord && (
                <a href={`discordapp://${member.discord}`} target="_blank">
                  <BsDiscord />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;