import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CloseCircleIcon,
  CloseIcon,
  LoadingAnimation,
  PlusIcon,
  UpdateIcon,
} from "src/assets/iconify";
import { FormCheckbox } from "src/components/Form/FormCheckBox";
import FormProvider from "src/components/Form/FormProvider";
import FormSelectField from "src/components/Form/FormSelectField";
import FormTextArea from "src/components/Form/FormTextArea";
import FormTextFiels from "src/components/Form/FormTextField";
import { RESIconButton } from "src/components/RESIconButton";
import Scrollbar from "src/components/Scrollbar";
import UploadImage from "src/components/UploadImage";
import showMessage from "src/util/ShowMessage";
import * as yup from "yup";
import AddPropertyDialog from "../Property/AddPropertyDialog";
import { PropertyApi, PropertyClass } from "../Property/DataObject";
import { RoomApi, RoomClass, enumRoomType } from "./DataObject";
import useAuth from "src/hooks/useAuth";

type Props = {
  onClose: () => void;
  objRoom: RoomClass;
  getAllRooms: () => void;
};

const AddRoomSchema = yup.object().shape({
  property: yup.object().shape({
    _id: yup.string().required("Property is required"),
  }),
  roomNumber: yup.number().required("Room Number is required"),
  price: yup.number().required("Price is required"),
  maxOccupancy: yup.number().min(1),
  amenities: yup.array().of(yup.string().required("Amenity is required")),
});

export default function AddRoomDialog({
  objRoom,
  onClose,
  getAllRooms,
}: Props) {
  const [showUploadRoomImgDialog, setShowUploadRoomImgDialog] =
    useState<boolean>(false);
  const [showPropertyLoading, setShowPropertyLoading] =
    useState<boolean>(false);
  const [propertyList, setPropertyList] = useState<PropertyClass[]>([]);
  const [RoomDetails, setRoomDetails] = useState<RoomClass>(objRoom);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const [showAddPropertyDialog, setShowAddProperty] = useState<boolean>(false);
  const [objProperty, setObjProperty] = useState<PropertyClass>(
    new PropertyClass()
  );
  const {
    user: {
      userInfo: { id },
    },
  } = useAuth();

  useEffect(() => {
    getAllProperty();
  }, []);

  const _Method = useForm<RoomClass>({
    defaultValues: objRoom,
    resolver: yupResolver(AddRoomSchema) as any,
  });
  const { handleSubmit, control } = _Method;

  const { fields, append, remove } = useFieldArray<RoomClass>({
    control,
    name: "amenities" as any,
  });

  const openAddPropertyDialog = () => {
    let _newObjProperty = new PropertyClass();
    _newObjProperty.adminID = id;
    setObjProperty(_newObjProperty);
    setShowAddProperty(true);
  };

  const openUploadroomimageDialog = () => {
    setShowUploadRoomImgDialog(true);
  };

  const closeUploadroomimageDialog = () => {
    setShowUploadRoomImgDialog(false);
  };

  const SaveRoomImageList = (ImageList: any[]) => {
    setRoomDetails({ ...RoomDetails, images: ImageList });
  };

  const getAllProperty = () => {
    setShowPropertyLoading(true);
    PropertyApi.getAllProperty(
      objRoom.adminID,
      (res) => {
        setPropertyList(res);
        setShowPropertyLoading(false);
      },
      (err) => {
        showMessage(err, theme, () => {});
        setShowPropertyLoading(false);
      }
    );
  };

  const onAddRoom = (_objRoom: RoomClass) => {
    if (RoomDetails.images.length !== 0) {
      RoomDetails.images.forEach((img) => _objRoom.images.push(img));
      setLoading(true);

      if (objRoom._id === "") {
        //new
        RoomApi.addNewRoom(
          _objRoom,
          (res) => {
            showMessage(res, theme, () => {});
            setLoading(false);
            onClose();
            getAllRooms();
          },
          (err) => {
            showMessage(err, theme, () => {});
            setLoading(false);
          }
        );
      } else {
        //update
        RoomApi.updatedRoom(
          _objRoom,
          (res) => {
            showMessage(res, theme, () => {});
            setLoading(false);
            onClose();
            getAllRooms();
          },
          (err) => {
            showMessage(err, theme, () => {});
            setLoading(false);
          }
        );
      }
    } else {
      showMessage("Select atleast One Room Image", theme, () => {});
    }
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>
        {objRoom._id === "" ? "Add Room" : "Update Room"}
      </DialogTitle>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2 }} />
      <FormProvider methods={_Method} onSubmit={handleSubmit(onAddRoom)}>
        <DialogContent
          sx={{
            height: { sm: 400, md: 450, xl: 500 },
            maxHeight: { sm: 400, md: 450, xl: 500 },
          }}
        >
          <Scrollbar sx={{ height: "100%" }}>
            <FieldWrapper>
              {showPropertyLoading ? (
                <PropertyLoadingText>Getting Property...</PropertyLoadingText>
              ) : propertyList.length === 0 ? (
                <Button
                  startIcon={<PlusIcon />}
                  variant="outlined"
                  onClick={openAddPropertyDialog}
                >
                  Create Property First
                </Button>
              ) : (
                <FormSelectField
                  variant="outlined"
                  label="Property"
                  name="property._id"
                >
                  <option value={""}></option>
                  {propertyList.map((objProperty) => (
                    <option value={objProperty._id} key={objProperty._id}>
                      {objProperty.name}
                    </option>
                  ))}
                </FormSelectField>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <InputWrapper>
                <FormSelectField
                  variant="outlined"
                  label="Room Type"
                  name="type"
                >
                  <option value={enumRoomType.Single_Room}>Single Room</option>
                  <option value={enumRoomType.Double_Room}>Double Room</option>
                  <option value={enumRoomType.Triple_Room}>Triple Room</option>
                  <option value={enumRoomType.King_Room}>King Room</option>
                  <option value={enumRoomType.Executive_Room}>
                    Executive Room
                  </option>
                  <option value={enumRoomType.Queen_Room}>Queen Room</option>
                  <option value={enumRoomType.Juniour_Suites}>
                    Junior Suites
                  </option>
                </FormSelectField>
              </InputWrapper>

              <InputWrapper>
                <FormTextFiels
                  name="roomNumber"
                  label="Room No"
                  fullWidth
                  variant="outlined"
                  type="number"
                />
              </InputWrapper>
            </FieldWrapper>

            <FieldWrapper>
              <InputWrapper>
                <FormTextFiels
                  name="price"
                  label="Price"
                  fullWidth
                  variant="outlined"
                  type="number"
                />
              </InputWrapper>

              <InputWrapper>
                <FormTextFiels
                  name="maxOccupancy"
                  label="Max Occupancy"
                  fullWidth
                  variant="outlined"
                  type="number"
                />
              </InputWrapper>
            </FieldWrapper>

            <FieldWrapper>
              <InputWrapper>
                <FormCheckbox
                  name="isAvailable"
                  label="Is Available"
                  labelPlacement="start"
                />
              </InputWrapper>
            </FieldWrapper>

            <FieldWrapper>
              <InputWrapper>
                <FormTextArea
                  minRows={3}
                  name="description"
                  placeholder="Description"
                  style={{ width: "100%" }}
                />
              </InputWrapper>
            </FieldWrapper>

            <FieldWrapper
              sx={{
                flexWrap: "wrap",
              }}
            >
              {fields.map((field, index) => (
                <Box key={field.id} position={"relative"}>
                  <FormTextFiels
                    label="Amenitie"
                    name={`amenities.${index}`}
                    sx={{ width: "9rem" }}
                  />
                  <CloseCircleIcon
                    style={{
                      position: "absolute",
                      right: -4,
                      top: -8,
                      cursor: "pointer",
                    }}
                    onClick={() => remove(index)}
                  />
                </Box>
              ))}

              <RESIconButton
                iconposition="start"
                starticon={<PlusIcon />}
                variant="outlined"
                onClick={() => append("")}
              >
                Add Amenities
              </RESIconButton>
            </FieldWrapper>
          </Scrollbar>
        </DialogContent>
        <Divider orientation="horizontal" flexItem sx={{ mt: 2 }} />
        <DialogActions>
          <Button
            onClick={openUploadroomimageDialog}
            startIcon={<UpdateIcon />}
            variant="outlined"
            sx={{ marginRight: "auto" }}
          >
            Upload Image
          </Button>
          <RESIconButton
            iconposition="start"
            starticon={loading ? <LoadingAnimation /> : <PlusIcon />}
            variant="outlined"
            type="submit"
          >
            Add
          </RESIconButton>
          <RESIconButton
            iconposition="start"
            starticon={<CloseIcon />}
            variant="contained"
            type="submit"
            onClick={onClose}
          >
            Close
          </RESIconButton>
        </DialogActions>
      </FormProvider>

      {showUploadRoomImgDialog && (
        <UploadImage
          onClose={closeUploadroomimageDialog}
          onSaveImages={SaveRoomImageList}
          imageList={RoomDetails.images}
          Tilte="Room Images"
        />
      )}

      {showAddPropertyDialog && (
        <AddPropertyDialog
          objProperty={objProperty}
          onClose={() => setShowAddProperty(false)}
        />
      )}
    </Dialog>
  );
}

const FieldWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "0.8rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",

  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const PropertyLoadingText = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  textAlign: "center",
  color: theme.palette.primary.main,
}));
