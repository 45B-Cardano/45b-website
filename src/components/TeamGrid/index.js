import {
  BsDiscord,
  BsLink,
  BsLink45Deg,
  BsLinkedin,
  BsTelegram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

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
              {member.twitter && (
                <a href={member.twitter} target="_blank">
                  <BsTwitter />
                </a>
              )}
              {member.discord && (
                <a href={`https://discord.com/users/${member.discord}`} target="_blank">
                  <BsDiscord />
                </a>
              )}
              {member.telegram && (
                <a href={member.telegram} target="_blank">
                  <BsTelegram />
                </a>
              )}
              {member.link && (
                <a href={member.link} target="_blank">
                  <BsLink45Deg />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
                                  <Link className="button button--primary button--lg" to="https://miro.com/app/board/uXjVMGizkdo=/?share_link_id=203438424168">
                          More about 45B
                        </Link>
    </div>
  );
};

export default TeamGrid;
