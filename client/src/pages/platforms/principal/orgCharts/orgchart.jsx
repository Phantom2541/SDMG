import React from "react";
import "./tree.css";

const Card = ({ label = "", children }) => {
  return <>test</>;
};

export default function OrgCharts() {
  return (
    <div className="tree">
      <Card />
      <ul>
        <li>
          <span>Principal</span>
          <ul>
            <li>
              <span>Vice Principal</span>
              <ul>
                <li>
                  <span>Elementary</span>
                  <ul>
                    <li>
                      <span>Head</span>
                      <ul>
                        <li>
                          <span>Master</span>
                          <ul>
                            <li>
                              <span>Teacher</span>
                              <ul>
                                <li>
                                  <span>Teacher</span>
                                  <ul>
                                    <li>
                                      <span>Teacher</span>
                                      <ul>
                                        <li>
                                          <span>Teacher</span>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Teacher</span>
                              <ul>
                                <li>
                                  <span>Teacher</span>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Teacher</span>
                              <ul>
                                <li>
                                  <span>Teacher</span>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Junior High School</span>
                </li>
                <li>
                  <span>Senior High School</span>
                </li>
                <li>
                  <span>College</span>
                </li>
              </ul>
            </li>

            {/* <li>
              <span >Child</span>
              <ul>
                <li>
                  <span >Grand Child</span>
                </li>
                <li>
                  <span >Grand Child</span>
                  <ul>
                    <li>
                      <span >Great Grand Child</span>
                    </li>
                    <li>
                      <span >Great Grand Child</span>
                    </li>
                    <li>
                      <span >Great Grand Child</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span >Grand Child</span>
                </li>
              </ul>
            </li> */}
          </ul>
        </li>
      </ul>
    </div>
  );
}
