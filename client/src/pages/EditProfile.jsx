import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

function EditProfile () {
  return (
    <div className="relative rounded bg-bg shadow-[0px_1px_13px_rgba(0,_0,_0,_0.05)] w-[870px] h-[630px] overflow-hidden text-left text-base text-text2 font-title-16px-medium">
      <h3 className="m-0 absolute top-[40px] left-[80px] text-xl leading-[28px] font-medium font-inherit text-button2">Edit Your Profile</h3>
      <div className="absolute top-[84px] left-[80px] flex flex-row items-start justify-start gap-[50px]">
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <div className="relative leading-[24px] hidden">First Name</div>
          <Form.Group className="w-[330px] [border:none] bg-[transparent] relative">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>
        </div>
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <div className="relative leading-[24px] hidden">Last Name</div>
          <Form.Group className="w-[330px] [border:none] bg-[transparent] relative">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
        </div>
      </div>
      <div className="absolute top-[190px] left-[80px] flex flex-row items-start justify-start gap-[50px]">
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <div className="relative leading-[24px] hidden">Email</div>
          <Form.Group className="w-[330px] [border:none] bg-[transparent] relative">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
        </div>
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <div className="relative leading-[24px] hidden">Address</div>
          <Form.Group className="w-[330px] [border:none] bg-[transparent] relative">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" />
          </Form.Group>
        </div>
      </div>
      <div className="absolute top-[296px] left-[80px] flex flex-col items-start justify-start gap-[16px]">
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <h4 className="m-0 relative text-inherit leading-[24px] font-normal font-inherit">Password Changes</h4>
          <Form.Group className="w-[710px] [border:none] bg-[transparent] relative">
            <Form.Control type="text" placeholder="Enter current password" />
          </Form.Group>
        </div>
        <Form.Group className="w-[710px] [border:none] bg-[transparent] relative">
          <Form.Label>New Passwod</Form.Label>
          <Form.Control type="text" placeholder="Enter New Password" />
        </Form.Group>
        <Form.Group className="w-[710px] [border:none] bg-[transparent] relative">
          <Form.Label>Confirm New Passwod</Form.Label>
          <Form.Control type="text" placeholder="Confirm New Password" />
        </Form.Group>
      </div>
      <div className="absolute top-[calc(50%_+_219px)] right-[80px] flex flex-row items-center justify-start gap-[32px]">
        <Button className="relative" variant="outline-dark">
          Cancel
        </Button>
        <Button variant="danger">Save Changes</Button>
      </div>
    </div>
  );
};

export default EditProfile;
